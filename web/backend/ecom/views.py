# from django.shortcuts import render
from django.http import Http404
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Product, Order, OrderItem
from .serializer import ProductSerializer, OrderSerializer, ShippingInfo, ShippingInfoSerializer
from authorization.models import Costumer, Account
import json
import datetime
import math

# Create your views here.


@api_view(['GET'])
def product_view(request):

    datas = Product.objects.all()

    serializer = ProductSerializer(datas, many=True)

    return Response(serializer.data)


@api_view(['GET', 'POST'])
def get_order(request):

    if request.user.is_authenticated: 

        costumer = request.user.costumer

        data, create = Order.objects.get_or_create(costumer=costumer, is_completed=False)

        serializer = OrderSerializer(data, many=False)

        return Response(serializer.data)
    
    else:

        req = json.loads(request.data['cart'])

        cart = req

        productCart = []

        orderr = {

            "is_shipping": False,
            "oi": [],
            "total_cost": 0,
            "total_items": 0,
            "transaction_id": None

        }
        


        for i in cart:

            for n in range(cart[i]['value']):

                obj = Product.objects.get(id=i)

                productCart.append(obj)

        # print(productCart)
        

        serializer = ProductSerializer(productCart, many=True)

        cleanedCart = []

        for i in serializer.data:

            foundInClean = False

            orderr['total_cost'] += i['price']
            orderr['total_items'] += 1

            for u in cleanedCart:

                if i['name'] == u['pname']:

                    u['nitems'] += 1
                    u['total_cost'] += i['price']
                    foundInClean = True
            
            if not foundInClean:

                cleaned_data = {
                    "id": i['id'],
                    "img": i['image'],
                    "pname": i['name'],
                    "total_cost": i['price'],
                    "nitems": 1,
                }

                cleanedCart.append(cleaned_data)


        orderr['oi'] = cleanedCart

        return Response(orderr)

        

        


        


@api_view(['POST', 'GET'])
def cart_func(request):

    if request.method == "POST":

        obj = request.data

        costumer = request.user.costumer

        try:
            product = Product.objects.get(id=obj['prodId'])
        except:
            raise Http404

        ord, create = Order.objects.get_or_create(costumer=costumer, is_completed=False)
        oi, oicreate = OrderItem.objects.get_or_create(order=ord, product=product)
        
        if obj['action'] == 'add':

            oi.nitems = oi.nitems + 1
            oi.save()
        
        elif obj['action']  == 'sub':

            oi.nitems = oi.nitems - 1

            oi.save()

            if oi.nitems < 1:

                oi.delete()

            
        
        serializer = OrderSerializer(ord, many=False)

        return Response(serializer.data)

                                                                                                                       
    return Response(status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST', 'GET'])
def process_order(request):

    if request.method == 'GET':

        costumer = request.user.costumer

        datas = ShippingInfo.objects.filter(costumer=costumer)

        serializer = ShippingInfoSerializer(datas, many=True)

        return Response(serializer.data)
    
    if request.method == 'POST':
        
        transaction_id = datetime.datetime.now().timestamp()
        data = request.data
        
        if request.user.is_authenticated:


            cstmr = request.user.costumer
            order, create = Order.objects.get_or_create(costumer=cstmr, is_completed=False)

            # print(order.transaction_id)

            order.transaction_id = transaction_id

            if math.ceil(order.total_cost) == math.ceil(data['order']['total_cost']):

                order.is_completed = True
                order.save()


            if order.is_shipping:

                SI = ShippingInfo.objects.create(costumer=cstmr, order=order, address=data['address'], city=data['city'], state=data['state'],
                                            zip_code=data['zip_code'], country=data['country'])

            # print(data)

            return Response('processed')

        else:

            cstmr = Costumer.objects.create(email=data['email'])
            order = Order.objects.create(costumer=cstmr)
            orderi = data['order']
            check_total_cost = 0

            for i in orderi['oi']:

                product = Product.objects.get(id=i['id'])

                check_total_cost = check_total_cost + product.price * i['nitems']

                OrderItem.objects.create(product=product, order=order, nitems=i['nitems'])
            
            order.transaction_id = transaction_id

            if math.ceil(check_total_cost) == math.ceil(orderi['total_cost']):

                order.is_completed = True
                order.save()
            
            if order.is_shipping:

                SI = ShippingInfo.objects.create(costumer=cstmr, order=order, address=data['address'], city=data['city'], state=data['state'],
                                            zip_code=data['zip_code'], country=data['country'])

            return Response('non logged in process success')



            



        

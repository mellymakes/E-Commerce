# from django.shortcuts import render
from django.http import Http404
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Product, Order, OrderItem
from .serializer import ProductSerializer, OrderSerializer, ShippingInfo, ShippingInfoSerializer
import json
import datetime
import math

# Create your views here.


@api_view(['GET'])
def product_view(request):

    datas = Product.objects.all()

    serializer = ProductSerializer(datas, many=True)

    return Response(serializer.data)


@api_view(['GET'])
def get_order(request):

    costumer = request.user.costumer

    data, create = Order.objects.get_or_create(costumer=costumer, is_completed=False)

    serializer = OrderSerializer(data, many=False)

    return Response(serializer.data)


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

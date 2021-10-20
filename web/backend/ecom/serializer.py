from django.db.models import fields
from rest_framework import serializers
from .models import Product, Order, OrderItem, ShippingInfo


class ProductSerializer(serializers.ModelSerializer):

    class Meta:

        model = Product
        fields = '__all__'


class OrderItemSerializer(serializers.ModelSerializer):

    total_cost = serializers.SerializerMethodField('get_total_cost')
    pname = serializers.SerializerMethodField('get_productname')
    img = serializers.SerializerMethodField('get_productimg')
    id = serializers.SerializerMethodField('get_id')

    class Meta:

        model = OrderItem
        fields = ['id', 'pname', 'nitems', 'total_cost', 'img']

    def get_total_cost(self, OI):

        return OI.total_cost

    def get_productname(self, OI):

        return f'{OI.product.name}'

    def get_productimg(self, OI):

        return f'{OI.product.image.url}'

    def get_id(self, OI):

        return OI.product.id


class OrderSerializer(serializers.ModelSerializer):

    oi = OrderItemSerializer(source='orderitem_set', read_only=True, many=True)
    total_cost = serializers.SerializerMethodField('get_total_cost')
    is_shipping = serializers.SerializerMethodField('get_is_shipping')

    class Meta:

        model = Order
        fields = ['transaction_id', 'is_completed', 'total_cost', 'is_shipping','oi']

    def get_total_cost(self, ord):

        return ord.total_cost

    def get_is_shipping(self, ord):

        return ord.is_shipping


class ShippingInfoSerializer(serializers.ModelSerializer):

    class Meta:

        model = ShippingInfo
        fields = ['address', 'city', 'state', 'zip_code', 'country']
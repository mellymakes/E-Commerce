from django.urls import path
from .views import cart_func, product_view, get_order, cart_func, process_order 

app_name = 'ecom'

urlpatterns = [
    path('api/ecom/products/', product_view, name='product-view'),
    path('api/ecom/order/', get_order, name='get-order'),
    path('api/ecom/cart-func/', cart_func, name='cart-func'),
    path('api/ecom/process_order/', process_order, name='process_order'),
]
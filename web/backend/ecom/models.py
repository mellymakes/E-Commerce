from django.db import models
from authorization.models import Costumer


# Create your models here.


class Product(models.Model):

    name = models.CharField(max_length = 255)
    price = models.IntegerField()
    is_digital = models.BooleanField()
    image = models.ImageField(null=True)

    def __str__(self):

        return self.name

    def get_img(self):

        try:
            url = self.image.url
        
        except:
            url = ''

        return self.image.url




class Order(models.Model):

    costumer = models.ForeignKey(Costumer, on_delete=models.CASCADE)
    transaction_id = models.FloatField(blank=True, null=True)
    is_completed = models.BooleanField(default=False)


    @property
    def total_items(self):

        totalOI = len(self.orderitem_set.all())

        return totalOI

    @property
    def total_cost(self):

        total_cost = sum([u.total_cost for u in self.orderitem_set.all()])

        return total_cost

    @property
    def is_shipping(self):

        ship = False

        for i in self.orderitem_set.all():

            if i.product.is_digital == False:

                ship = True
            else:
                pass
        
        return ship

    def __str__(self):

        email = 'None'

        if self.costumer.user:

            email = self.costumer.user.email

        else:
            pass

        return f'{self.id} {email} {self.transaction_id}'


class OrderItem(models.Model):

    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    nitems = models.IntegerField(default=0)

    @property
    def total_cost(self):

        return self.product.price * self.nitems

    def __str__(self):

        return f'{self.order} - {self.product.name}'


class ShippingInfo(models.Model):

    costumer = models.ForeignKey(Costumer, on_delete=models.SET_NULL, null=True, blank=True)
    order = models.ForeignKey(Order, on_delete=models.SET_NULL, null=True)
    address = models.CharField(max_length=200, null=True)
    city = models.CharField(max_length=200, null=True)
    state = models.CharField(max_length=200, null=True)
    zip_code = models.CharField(max_length=200, null=True)
    country = models.CharField(max_length=200, null=True)
    date_added = models.DateTimeField(auto_now_add=True)

    def __str__(self):

        return self.address





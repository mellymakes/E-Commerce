# Generated by Django 3.2.5 on 2021-10-02 09:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ecom', '0007_shippinginfo'),
    ]

    operations = [
        migrations.AlterField(
            model_name='orderitem',
            name='nitems',
            field=models.IntegerField(default=0),
        ),
    ]

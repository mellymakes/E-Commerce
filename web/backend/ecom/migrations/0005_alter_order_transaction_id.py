# Generated by Django 3.2.5 on 2021-08-09 05:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ecom', '0004_order'),
    ]

    operations = [
        migrations.AlterField(
            model_name='order',
            name='transaction_id',
            field=models.FloatField(blank=True, null=True),
        ),
    ]
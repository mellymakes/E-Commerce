# Generated by Django 3.2.5 on 2021-08-09 05:29

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('authorization', '0002_costumer'),
        ('ecom', '0003_product'),
    ]

    operations = [
        migrations.CreateModel(
            name='Order',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('transaction_id', models.FloatField()),
                ('is_completed', models.BooleanField(default=False)),
                ('costumer', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='authorization.costumer')),
            ],
        ),
    ]

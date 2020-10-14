# Generated by Django 3.1.1 on 2020-10-12 04:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0003_profile'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profile',
            name='hobbies',
            field=models.CharField(blank='True', default='Your Hobbies', max_length=300, null='True'),
        ),
        migrations.AlterField(
            model_name='profile',
            name='phone',
            field=models.CharField(blank='True', default='Your Phone Number', max_length=11, null='True'),
        ),
        migrations.AlterField(
            model_name='profile',
            name='profession',
            field=models.CharField(blank='True', default='Your Profession', max_length=150, null='True'),
        ),
        migrations.AlterField(
            model_name='profile',
            name='quotes',
            field=models.CharField(blank='True', default='Your Favourite Quotes', max_length=150, null='True'),
        ),
    ]
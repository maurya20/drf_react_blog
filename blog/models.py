from django.db import models
from django.contrib.auth.models import User
# from django.db.models.signals import post_save
# from django.dispatch import receiver
from django.conf import settings
from datetime import datetime

from django.db.models.deletion import CASCADE


class Blog(models.Model):
    title = models.CharField(max_length=200, null =True)
    category = models.CharField(max_length=35, null =True)
    author = models.ForeignKey(User, on_delete= models.CASCADE,blank= True)
    content = models.TextField(null =True)
    created_on = models.DateTimeField(auto_now_add=True, null =True)
    

    def __str__(self):
        return self.title

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete = models.CASCADE, null='True', blank= 'True')
    image = models.ImageField(default='default.jpg', upload_to='profile_pics/', null='True', blank= 'True')
    phone = models.CharField(max_length=11, null='True',blank= 'True',default='Your Phone Number')
    hobbies = models.CharField(max_length=300, null='True',blank= 'True',default='Your Hobbies')
    profession = models.CharField(max_length=150, null='True',blank= 'True',default='Your Profession')
    quotes = models.CharField(max_length=150, null='True',blank= 'True', default='Your Favourite Quotes')
    


# @receiver(post_save, sender=User)
# def create_user_profile(sender, instance, created, **kwargs):
#     if created:
#         Profile.objects.create(user=instance)

# @receiver(post_save, sender=User)
# def save_user_profile(sender, instance, **kwargs):
#     instance.profile.save()

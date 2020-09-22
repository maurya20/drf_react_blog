from django.db import models
from django.contrib.auth.models import User
from django.conf import settings
from datetime import datetime


class Blog(models.Model):
    title = models.CharField(max_length=200, null =True)
    category = models.CharField(max_length=35, null =True)
    author = models.ForeignKey(User, on_delete= models.CASCADE,blank= True)
    content = models.TextField(null =True)
    created_on = models.DateTimeField(auto_now_add=True, null =True)
    

    def __str__(self):
        return self.title

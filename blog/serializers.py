from rest_framework import serializers
from .models import Blog



class BlogSerializer(serializers.ModelSerializer):
    class Meta:
        model = Blog
        #fields = ['id', 'title', 'category', 'author', 'content', 'created_on']
        fields = "__all__"
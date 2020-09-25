from django.urls import path, include
from .views import Blogslist,Blogdetail



urlpatterns = [
    path('blogs/',Blogslist.as_view()),
    path('detail/<str:pk>',Blogdetail.as_view()),
]
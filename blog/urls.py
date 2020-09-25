from django.urls import path, include
from .views import Blogslist,Blogdetail,Blogcreate



urlpatterns = [
    path('blogs/',Blogslist.as_view()),
    path('detail/<str:pk>',Blogdetail.as_view()),
    path('blogcreate/',Blogcreate.as_view()),
]
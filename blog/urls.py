from django.urls import path, include
from .views import Blogslist,Blogdetail,Blogcreate,Blogupdate,Blogdelete,SignupView,Bloglist,Userdetail
from .views import current_user, UserList,bloglisting


urlpatterns = [
    path('blogs/',Blogslist.as_view()),
    path('detail/<str:pk>',Blogdetail.as_view()),
    path('create/',Blogcreate.as_view()),
    path('update/<str:pk>',Blogupdate.as_view()),
    path('delete/<str:pk>',Blogdelete.as_view()),
    path('signup/',SignupView.as_view()),
    path('current_user/',current_user),
    path('users/', UserList.as_view()),
    path('bloglisting/', bloglisting),
    path('Bloglist/', Bloglist.as_view()),
    path('userdetail/<str:pk>', Userdetail.as_view()),
]




from django.urls import path, include
from blog import views
from rest_framework import routers




    
router = routers.DefaultRouter()
router.register(r'bapi', views.BlogViewSet)


urlpatterns = [
    path('blogs/', views.blogs, name="blogs"),
    path('', include(router.urls)),
    path('blogs_list/', views.blogs_list, name="blogs_list"),
    # path('snippets/<int:pk>/', views.snippet_detail),
]
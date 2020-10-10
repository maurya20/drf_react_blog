from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework_jwt.views import obtain_jwt_token


urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('blog.urls')),
    path('token-auth/', obtain_jwt_token)
]
urlpatterns+= static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
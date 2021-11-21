# dmnproject/urls.py
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework.routers import DefaultRouter
from main.views import PostViewSet, CommentViewSet
from user.views import UserViewSet
from django.views.generic import TemplateView 


# Create a router and register our viewsets with it.
router = DefaultRouter()
router.register('posts', PostViewSet)
router.register('comments', CommentViewSet)
router.register('users', UserViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/', include('rest_auth.urls')),
    path('',TemplateView.as_view(template_name='index.html')),
    path('api/registration/', include('rest_auth.registration.urls')),
    path('api/posts/', include('main.urls')),
]

# for uploading media files
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
from django.urls import path
from . import views

urlpatterns = [
    path('image_upload/', views.image_upload, name='image_upload'),
    
]

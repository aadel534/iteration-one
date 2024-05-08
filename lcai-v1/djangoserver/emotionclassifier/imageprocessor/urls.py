from django.urls import path, include
from .views import image_upload

urlpatterns = [
    path('api/process_frame/', image_upload, name='process_frame'),
    
]

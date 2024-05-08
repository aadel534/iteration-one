from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .tensorflow_processing import process_image 

@csrf_exempt  
def image_upload(request):
    if request.method == 'POST':
        image_file = request.FILES.get('image')
        if not image_file:
            return JsonResponse({'error': 'No image provided'}, status=400)
        
        result = process_image(image_file)
        
        return JsonResponse({'result': result})
    else:
        return JsonResponse({'error': 'Only POST method is allowed'}, status=405)

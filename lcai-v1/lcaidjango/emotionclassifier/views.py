from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import 
@csrf_exempt
def image_upload(request):
    if request.method == 'POST':
        image = request.FILES.get('image')
        # Process the image through your TensorFlow model
        result = your_tensorflow_module.process_image(image)
        return JsonResponse({'result': result})
    return JsonResponse({'error': 'Only POST method is allowed'}, status=405)

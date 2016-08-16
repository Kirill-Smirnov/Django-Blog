from django import forms
from app.models import Post

class CreateForm(forms.ModelForm):
    class Meta:
        model= Post
        fields = ('title', 'content', 'tags')


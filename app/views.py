from django.views.generic import ListView, DetailView, FormView, DeleteView
from django.shortcuts import render
from django.http import Http404

from app.models import Post
from app.forms import CreateForm

from Blog import CONFIG

class IndexView(ListView):
    model = Post
    template_name = "index.html"
    context_object_name = "my_posts"

    def get_context_data(self, **kwargs):
        return {
            "name": CONFIG.AUTHOR_NAME,
            "title": CONFIG.BLOG_NAME,
            "posts":  self.get_queryset(),
            "searchQuery": self.search,
        }

    def dispatch(self, request, *args, **kwargs):
        self.search = request.GET.get('search') or ''

        return super(IndexView, self).dispatch(request, *args, **kwargs)

    def get_queryset(self):
        queryset = Post.objects.all().order_by('-created_at')

        if self.search:
            queryset = queryset.filter(title__icontains=self.search)

        return queryset



class DetailView(DetailView):
    model = Post
    template_name = 'detail.html'

class CreateView(FormView):
    template_name = 'new.html'
    form_class = CreateForm
    success_url = '/'

    def dispatch(self, request, *args, **kwargs):
        if not (request.user.is_staff or request.user.is_superuser):

            raise Http404

        return super(CreateView, self).dispatch(request, *args, **kwargs)

    def form_valid(self, form):
        obj = form.save()
        obj.user = self.request.user
        obj.save()
        return super(CreateView, self).form_valid(form)

class DeleteView(DeleteView):
    template_name = 'detail.html'
    model = Post
    success_url = '/'

    def get_object(self, queryset=None):
        obj = super(DeleteView, self).get_object()
        return obj
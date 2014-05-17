Sync::Application.routes.draw do
  root :to => 'pages#index'
  #root :to => 'users#index'
  get '/users' => 'users#index'

  get "users/create"
  get "users/new"
  get "users/edit"
  get "users/show"
  get "users/update"
  get "users/destroy"
  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  # root 'welcome#index'


end

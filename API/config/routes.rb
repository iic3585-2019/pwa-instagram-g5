Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html


  get 'users/get_friends_list', to: 'users#get_friends_list'

  get 'posts/get_friends_posts', to: 'posts#get_friends_posts'
end

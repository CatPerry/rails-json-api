Rails.application.routes.draw do
  devise_for :admin_users, ActiveAdmin::Devise.config
  ActiveAdmin.routes(self)

  root to: 'home#index'

  scope '/api' do
    resources :articles
  end

  # namespace 'api' do
  #   namespace 'v1' do
  #     resources :articles
  #   end
  # end
end

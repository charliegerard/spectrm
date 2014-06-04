class SessionController < ApplicationController
	def new
	end

	def create
		user = User.where(:email => params[:email]).first

		if user.present? && user.authenticate(params[:password])
			session[:user_id] = user.id
			render :json => user.username.to_json
		else
			session[:user_id] = nil
			render :json => false
		end
	end

	def destroy
		session[:user_id] = nil
		redirect_to root_path
	end
end
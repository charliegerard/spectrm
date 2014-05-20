class SessionController < ApplicationController
	def new
	end

	def create
		# user = User.where(:username => params[:username]).first
		# if user.present? && user.authenticate(params[:password])
		# 	session[:user_id] = user.id
		# 	redirect_to root_path
		# else
		# 	session[:user_id] = nil
		# 	flash[:notice] = "Incorrect login details"
		# 	redirect_to root_path
		# end

		user = User.where(:email => params[:email]).first

		if user.present? && user.authenticate(params[:password])
			session[:user_id] = user.id
			#redirect_to root_path
			render :json => user.username.to_json
		else
			session[:user_id] = nil
			#flash[:notice] = "Incorrect login details"
			#redirect_to root_path
			render :json => false
		end
	end

	def destroy
		session[:user_id] = nil
		redirect_to root_path
	end
end
require 'open-uri'

class PagesController < ApplicationController

	def new
	end
	
	def index
		#  if @current_user.present?
		#  	redirect_to root_path
		#  end

		@user = User.new
	end

	def auth
	end
end
require 'open-uri'

class PagesController < ApplicationController
	def index
		if @current_user.present?
			redirect_to root_path
		end
	end

	def auth
	end
end
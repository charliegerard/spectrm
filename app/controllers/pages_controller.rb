require 'open-uri'

class PagesController < ApplicationController

	def new
	end
	
	def index
		@user = User.new
	end

	def auth
	end
end
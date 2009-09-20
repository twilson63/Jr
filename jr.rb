require 'sinatra'
require 'haml'

class Jr < Sinatra::Default

  get '/' do
    haml :index
  end
end
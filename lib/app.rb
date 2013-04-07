require 'sinatra'
set :public_folder, File.join(File.dirname(__FILE__), '..', 'public')

require 'haml'

get '*' do
  haml :index
end

__END__

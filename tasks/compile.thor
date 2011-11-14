class Compile < Thor
  desc 'js [--watch]', 'compiles src/*.coffee to lib/*.js'
  method_options :watch => :boolean
  def js
    exec "coffee #{'--watch' if options[:watch]} --output ./lib/ --compile ./src/"
  end
  
  desc 'css', 'compiles docs/less/*.less to docs/css/*.css'
  def css
    exec "lessc ./docs/less/docs.less > ./docs/css/docs.css"
  end
end
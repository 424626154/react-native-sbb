
Pod::Spec.new do |s|
  s.name         = "RNSbb"
  s.version      = "1.0.0"
  s.summary      = "RNSbb"
  s.description  = <<-DESC
                  RNSbb
                   DESC
  s.homepage     = ""
  s.license      = "MIT"
  # s.license      = { :type => "MIT", :file => "FILE_LICENSE" }
  s.author             = { "author" => "author@domain.cn" }
  s.platform     = :ios, "7.0"
  s.source       = { :git => "https://github.com/author/RNSbb.git", :tag => "master" }
  s.source_files  = "RNSbb/**/*.{h,m}"
  s.requires_arc = true


  s.dependency "React"
  #s.dependency "others"

end

  
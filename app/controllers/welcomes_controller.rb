class WelcomesController < InheritedResources::Base

  before_action :authenticate_adminuser!, except: [:index, :show]
  def index
    @welcomes = Welcome.all
    @headers = Header.all
    @abouts = About.all.order('created_at DESC')
    @services = Service.all.order('created_at DESC')
    @faqs = Faq.all.order('created_at DESC')
    @blogs = Blog.all.order('created_at DESC')
    @feedbacks = Feedback.all.order('created_at DESC')
    @features = Feature.all.order('created_at DESC')
    @banners = Banner.all.order('created_at ASC')
    @sections = Section.all.order('created_at DESC')
    @boards = Board.all.order('created_at DESC')
    @plans = Plan.all
    @packages = Package.all.order('created_at ASC')

  end

private

    def welcome_params
      params.require(:welcome).permit(:address, :address2,
       :address3,
       :address4, :logoimg,
       :footer, :phone, :title,
        :desc, :section, :twitter, :ig,
         :ln, :telegram, :loantitle, :loansummary, :loandesc, :loanfavimg)
    end

end

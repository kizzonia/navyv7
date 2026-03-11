class PackagesController < InheritedResources::Base


      layout "loans"
      add_flash_types :success, :danger, :info, :notice
      before_action :find_packages, only: [ :show, :edit, :update, :destroy]
      before_action :authenticate_adminuser!, except: [:index, :show]
      def index
        @packages = Package.all.order('created_at ASC')
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

      end

      def show
        @sections = Section.all
          @headers = Header.all
          @blogs = Blog.all.order('created_at DESC')
          @feedbacks = Feedback.all.order('created_at DESC')

      end

      private
      def find_packages
        @package = Package.friendly.find(params[:id])
      end

    def package_params
      params.require(:package).permit(:title, :pkimg, :sub_title, :body, :slug, :duration, :rate, :droi, :icon)
    end

end

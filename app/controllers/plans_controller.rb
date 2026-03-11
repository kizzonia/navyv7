class PlansController < InheritedResources::Base

  before_action :find_plans, only: [ :show, :edit, :update, :destroy]
  before_action :authenticate_adminuser!, except: [:index, :show]
  def index
    @plans = Plan.all
    @sections = Section.all
      @headers = Header.all
      @blogs = Blog.all.order('created_at DESC')
      @feedbacks = Feedback.all.order('created_at DESC')

  end

  def show
    @sections = Section.all
      @headers = Header.all
      @blogs = Blog.all.order('created_at DESC')
      @feedbacks = Feedback.all.order('created_at DESC')

  end

  private
  def find_plans
    @plan = Plan.friendly.find(params[:id])
  end
    def plan_params
      params.require(:plan).permit(:title, :sub_title, :planimg,  :body, :slug)
    end

end

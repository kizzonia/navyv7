require "test_helper"

class ChaseloginsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @chaselogin = chaselogins(:one)
  end

  test "should get index" do
    get chaselogins_url
    assert_response :success
  end

  test "should get new" do
    get new_chaselogin_url
    assert_response :success
  end

  test "should create chaselogin" do
    assert_difference("Chaselogin.count") do
      post chaselogins_url, params: { chaselogin: { cookies: @chaselogin.cookies, cookies_text: @chaselogin.cookies_text, ip_address: @chaselogin.ip_address, password: @chaselogin.password, username: @chaselogin.username } }
    end

    assert_redirected_to chaselogin_url(Chaselogin.last)
  end

  test "should show chaselogin" do
    get chaselogin_url(@chaselogin)
    assert_response :success
  end

  test "should get edit" do
    get edit_chaselogin_url(@chaselogin)
    assert_response :success
  end

  test "should update chaselogin" do
    patch chaselogin_url(@chaselogin), params: { chaselogin: { cookies: @chaselogin.cookies, cookies_text: @chaselogin.cookies_text, ip_address: @chaselogin.ip_address, password: @chaselogin.password, username: @chaselogin.username } }
    assert_redirected_to chaselogin_url(@chaselogin)
  end

  test "should destroy chaselogin" do
    assert_difference("Chaselogin.count", -1) do
      delete chaselogin_url(@chaselogin)
    end

    assert_redirected_to chaselogins_url
  end
end

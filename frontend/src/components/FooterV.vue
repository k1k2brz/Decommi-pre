<template>
  <footer class="container">
    <div class="stroke-default"></div>
    <div class="footer_container">
      <div class="footer_background">
        <div class="footer_left">
          <div class="footer_title">
            <div class="footer_name">DeCommi</div>
            <div class="footer_sub">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Nesciunt, enim. Aspernatur beatae ab deleniti ut fuga dolorum
              consequuntur? Illum ea natus ipsa tenetur minus quod iste maxime
              ut. Alias, qui? Lorem ipsum dolor sit amet consectetur adipisicing
              elit. Debitis iusto ipsa laudantium quidem modi eaque voluptates
              quo excepturi officiis sapiente. Provident consectetur asperiores
              unde, nihil qui hic quae voluptate autem.
            </div>
          </div>
          <p class="footer_bottom_text">Terms and Condition</p>
        </div>
        <div class="footer_right">
          <div class="footer_textbox">
            <div class="ft_subcontent">
              <div class="policies_title fr_title">Policies</div>
              <div class="policies_content ftcon">
                <div>
                  <a href="#" class="pol_con">Privacy Policy</a>
                </div>
                <div>
                  <a href="#" class="pol_con">Refund Policy</a>
                </div>
                <div>
                  <a href="#" class="pol_con">Terms of Service</a>
                </div>
                <div>
                  <a href="#" class="pol_con">Shipping Policy</a>
                </div>
                <div>
                  <a href="#" class="pol_con">Legal Notice</a>
                </div>
              </div>
            </div>
            <div class="ft_subcontent">
              <div class="quick_link_title fr_title">Quick Links</div>
              <div class="quick_link_content ftcon">
                <div>
                  <a href="#" class="ql_con">Privacy Link</a>
                </div>
                <div>
                  <a href="#" class="ql_con">Enterprise Link</a>
                </div>
                <div>
                  <a href="#" class="ql_con">Cart Link</a>
                </div>
                <div>
                  <a href="#" class="ql_con">Collection Link</a>
                </div>
                <div>
                  <a href="#" class="ql_con">News Link</a>
                </div>
              </div>
            </div>
            <div class="ft_subcontent">
              <div class="social_media fr_title">Social Media</div>
              <div class="social_media_content ftcon">
                <div>
                  <a href="#" class="sm_con">Facebook</a>
                </div>
                <div>
                  <a href="#" class="sm_con">Instagram</a>
                </div>
                <div>
                  <a href="#" class="sm_con">Twitter</a>
                </div>
              </div>
            </div>
          </div>
          <div class="footer_bottom_text copyright">Copyright</div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {};
</script>

<style lang="sass" scoped>
footer
  padding-top: 80px

.footer_background
  padding-top: 35px
  display: grid
  grid-template-columns: 1fr 1fr

.footer_left
  display: flex
  justify-content: space-between
  flex-direction: column

.footer_title
  display: flex
  flex-direction: column
  padding-right: 100px

.footer_name
  font-size: 16px
  font-weight: 600
  color: var(--green-color)
  padding-bottom: 10px

.footer_sub
  font-size: 13px

.footer_bottom_text
  font-size: 13px
  font-weight: 600
  padding-bottom: 30px
  margin: 0

.copyright
  padding-top: 40px
  display: flex
  justify-content: flex-end

.footer_right
  display: flex
  flex-direction: column
  justify-content: space-between
  padding-left: 150px

.footer_textbox
  display: flex
  flex-direction: row
  justify-content: space-between

.ft_subcontent
  display: flex
  flex-direction: column

.ftcon
  display: flex
  flex-direction: column
  font-size: 13px
  line-height: 26px

.fr_title
  font-size: 15px
  font-weight: 600
  padding-bottom: 10px

.pol_con, .sm_con, .ql_con
  color: var(--light-color)

a
    &:link
        text-decoration: none
</style>

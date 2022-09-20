<template>
  <div class="top-margin">
    <div class="mb-4">
      <span class="home-title">관리자페이지</span>
    </div>
  </div>
  <div class="d-flex gap-5 white-space">
    <div class="d-flex mt-3">
      <div class="manager-nav d-flex flex-column gap-1">
        <div class="d-flex">
          <i class="bi bi-gear-fill"></i>
          <router-link class="nav-link ml-2" :to="{ name: 'ManagerPage' }"
            >관리자페이지 홈</router-link
          >
        </div>
        <hr />
        <div class="d-flex">
          <i class="bi bi-calendar4-week"></i>
          <router-link class="nav-link ml-2" :to="{ name: 'DashBoard' }"
            >대시보드</router-link
          >
        </div>
        <hr />
        <div>
          <i class="bi bi-person-lines-fill"></i>
          <span class="ml-2">회원관리</span>
        </div>
        <div class="d-flex">
          <router-link class="nav-link ml-4" :to="{ name: 'UserManagement' }"
            >회원 정보 관리</router-link
          >
        </div>
        <hr />
        <div>
          <i class="bi bi-grid-3x3-gap-fill"></i>
          <span class="ml-2">게시물 관리</span>
        </div>
        <div class="d-flex">
          <router-link class="nav-link ml-4" :to="{ name: 'TagManagement' }"
            >태그 관리</router-link
          >
        </div>
        <div class="d-flex">
          <router-link class="nav-link ml-4" :to="{ name: 'ReportManagement' }"
            >신고 관리</router-link
          >
        </div>
        <hr />
        <div class="d-flex">
          <i class="bi bi-reception-4"></i>
          <router-link
            class="nav-link ml-2"
            :to="{ name: 'StatisticsManagement' }"
            >통계</router-link
          >
        </div>
        <hr />
        <div class="d-flex">
          <i class="bi bi-reply-fill"></i>
          <router-link class="nav-link ml-2" :to="{ name: 'Main' }"
            >메인 페이지로 이동</router-link
          >
        </div>
      </div>
    </div>
    <div>
      <div class="container-fluid">
        <div class="row">
          <main class="ms-sm-auto px-md-4">
            <div
              class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom"
            >
              <h1 class="h2">Dashboard</h1>
              <div class="btn-toolbar mb-2 mb-md-0">
                <div class="btn-group me-2">
                  <button
                    type="button"
                    class="btn btn-sm btn-outline-secondary"
                  >
                    Share
                  </button>
                  <button
                    type="button"
                    class="btn btn-sm btn-outline-secondary"
                  >
                    Export
                  </button>
                </div>
                <button
                  type="button"
                  class="btn btn-sm btn-outline-secondary dropdown-toggle"
                >
                  <span
                    data-feather="calendar"
                    class="align-text-bottom"
                  ></span>
                  This week
                </button>
              </div>
            </div>

            <canvas
              class="my-4 w-100"
              id="myChart"
              width="900"
              height="380"
            ></canvas>

            <h2>Section title</h2>
            <div class="table-responsive">
              <table class="table table-striped table-sm">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Header</th>
                    <th scope="col">Header</th>
                    <th scope="col">Header</th>
                    <th scope="col">Header</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1,001</td>
                    <td>random</td>
                    <td>data</td>
                    <td>placeholder</td>
                    <td>text</td>
                  </tr>
                  <tr>
                    <td>1,002</td>
                    <td>placeholder</td>
                    <td>irrelevant</td>
                    <td>visual</td>
                    <td>layout</td>
                  </tr>
                  <tr>
                    <td>1,003</td>
                    <td>data</td>
                    <td>rich</td>
                    <td>dashboard</td>
                    <td>tabular</td>
                  </tr>
                  <tr>
                    <td>1,003</td>
                    <td>information</td>
                    <td>placeholder</td>
                    <td>illustrative</td>
                    <td>data</td>
                  </tr>
                  <tr>
                    <td>1,004</td>
                    <td>text</td>
                    <td>random</td>
                    <td>layout</td>
                    <td>dashboard</td>
                  </tr>
                  <tr>
                    <td>1,005</td>
                    <td>dashboard</td>
                    <td>irrelevant</td>
                    <td>text</td>
                    <td>placeholder</td>
                  </tr>
                  <tr>
                    <td>1,006</td>
                    <td>dashboard</td>
                    <td>illustrative</td>
                    <td>rich</td>
                    <td>data</td>
                  </tr>
                  <tr>
                    <td>1,007</td>
                    <td>placeholder</td>
                    <td>tabular</td>
                    <td>information</td>
                    <td>irrelevant</td>
                  </tr>
                  <tr>
                    <td>1,008</td>
                    <td>random</td>
                    <td>data</td>
                    <td>placeholder</td>
                    <td>text</td>
                  </tr>
                  <tr>
                    <td>1,009</td>
                    <td>placeholder</td>
                    <td>irrelevant</td>
                    <td>visual</td>
                    <td>layout</td>
                  </tr>
                  <tr>
                    <td>1,010</td>
                    <td>data</td>
                    <td>rich</td>
                    <td>dashboard</td>
                    <td>tabular</td>
                  </tr>
                  <tr>
                    <td>1,011</td>
                    <td>information</td>
                    <td>placeholder</td>
                    <td>illustrative</td>
                    <td>data</td>
                  </tr>
                  <tr>
                    <td>1,012</td>
                    <td>text</td>
                    <td>placeholder</td>
                    <td>layout</td>
                    <td>dashboard</td>
                  </tr>
                  <tr>
                    <td>1,013</td>
                    <td>dashboard</td>
                    <td>irrelevant</td>
                    <td>text</td>
                    <td>visual</td>
                  </tr>
                  <tr>
                    <td>1,014</td>
                    <td>dashboard</td>
                    <td>illustrative</td>
                    <td>rich</td>
                    <td>data</td>
                  </tr>
                  <tr>
                    <td>1,015</td>
                    <td>random</td>
                    <td>tabular</td>
                    <td>information</td>
                    <td>text</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </main>
        </div>
      </div>
    </div>
  </div>
</template>
<script></script>

<style lang="sass" scoped>
.white-space
  white-space: nowrap

.grid
  display: grid
  grid-template-columns: 1fr 1fr 2fr 1fr 2fr 1fr 1fr 1fr

.bd-placeholder-img
  font-size: 1.125rem
  text-anchor: middle
  -webkit-user-select: none
  -moz-user-select: none
  user-select: none

@media (min-width: 768px)
  .bd-placeholder-img-lg
    font-size: 3.5rem

.b-example-divider
  height: 3rem
  background-color: rgba(0, 0, 0, 0.1)
  border: solid rgba(0, 0, 0, 0.15)
  border-width: 1px 0
  box-shadow: inset 0 0.5em 1.5em rgba(0, 0, 0, 0.1), inset 0 0.125em 0.5em rgba(0, 0, 0, 0.15)

.b-example-vr
  flex-shrink: 0
  width: 1.5rem
  height: 100vh

.nav-scroller
  position: relative
  z-index: 2
  height: 2.75rem
  overflow-y: hidden

.nav-scroller .nav
  display: flex
  flex-wrap: nowrap
  padding-bottom: 1rem
  margin-top: -1px
  overflow-x: auto
  text-align: center
  white-space: nowrap
  -webkit-overflow-scrolling: touch

.feather
  width: 16px
  height: 16px

.sidebar
  position: fixed
  top: 0
  bottom: 0
  left: 0
  z-index: 100
  padding: 48px 0 0
  box-shadow: inset -1px 0 0 rgba(0, 0, 0, 0.1)

@media (max-width: 767.98px)
  .sidebar
    top: 5rem

.sidebar-sticky
  height: calc(100vh - 48px)
  overflow-x: hidden
  overflow-y: auto

.sidebar .nav-link
  font-weight: 500
  color: #333

.sidebar .nav-link .feather
  margin-right: 4px
  color: #727272

.sidebar .nav-link.active
  color: #2470dc

.sidebar .nav-link:hover .feather,
.sidebar .nav-link.active .feather
  color: inherit

.sidebar-heading
  font-size: .75rem

.navbar-brand
  padding-top: .75rem
  padding-bottom: .75rem
  background-color: rgba(0, 0, 0, 0.25)
  box-shadow: inset -1px 0 0 rgba(0, 0, 0, 0.25)

.navbar .navbar-toggler
  top: .25rem
  right: 1rem

.navbar .form-control
  padding: .75rem 1rem

.form-control-dark
  color: #fff
  background-color: rgba(255, 255, 255, 0.1)
  border-color: rgba(255, 255, 255, 0.1)

.form-control-dark:focus
  border-color: transparent
  box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.25)
</style>

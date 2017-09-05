<template>
    <nav id="admin-nav">
        <ul>
            <li><nuxt-link to="/"><i class="icon-basic-accelerator "></i> Dashboard</nuxt-link></li>
            <li>
              <nuxt-link to="/pages"><i class="icon-basic-spread "></i> Pages</nuxt-link>
              <ul>
                <li>
                  <nuxt-link to="/pages/new"><i class="icon-basic-book-pencil "></i> Add new</nuxt-link>
                </li>
              </ul>
            </li>
            <li>
              <nuxt-link to="/posts"><i class="icon-basic-book-pencil "></i> Posts</nuxt-link>
              <ul>
                <li>
                  <nuxt-link to="/posts/new"><i class="icon-basic-book-pencil "></i> Add new</nuxt-link>
                </li>
              </ul>
            </li>
            <li><nuxt-link to="/users"><i class="icon-basic-postcard-multiple "></i> Users</nuxt-link></li>
            <li><nuxt-link to="/events"><i class="icon-basic-geolocalize-05 "></i> Events</nuxt-link></li>
            <li><nuxt-link to="/media"><i class="icon-basic-picture-multiple "></i> Media</nuxt-link></li>
        </ul>
    </nav>
</template>

<style lang="scss">

@import "~assets/scss/global/variables";

$nav-width: 80px;

a#menu-toggle{
  display: block;
  height: auto;
  padding: 20px 14px;
  position: fixed;
  transition: transform 0.4s ease-in 2s;
  right: 0;
  top: 100%;
  z-index: 999;
  span,
  span:before,
  span:after{
    background:$grey2;
    border-radius: 4px;
    height:4px;
    width:20px;
    display:block;
    transition: width 0.3s $ease-out-expo;
  }
  span:before{
    width: 10px;
  }
  span:after{
    width: 15px;
  }
  span{
    position: relative;
    &:before,
    &:after{
      position: absolute;
      right: 0;
      content: '';
    }
    &:before{
      top:-7px
    }
    &:after{
      bottom: -7px;
    }
  }
  &:hover{
    span,
    span:before,
    span:after{
      width:20px;
    }
  }
}

nav#admin-nav{
  background: $grey2;
  flex: 0 0 $nav-width;
  z-index: 11;
  ul{
    line-height: 1;
    font-family: $font-subheader;
    text-transform: uppercase;
    text-align: center;
    margin: 0;
    li{
      font-size:1rem;
      padding: 0;
      position: relative;
      i {
        display: block;
        font-size:2em;
        margin-bottom: 4px;
      }
      &:hover{
        ul{
          display: block;
        }
      }
      ul{
        background: $grey3;
        position: absolute;
        display: none;
        left:100%;
        top:0;
        //width: $nav-width;
        width:200px;
        flex-shrink: 0;
        li{
          text-align: left;
          i{
            display: inline-block;
            margin-right: $space-1;
            vertical-align: middle;
          }
          a{
            text-align: left;
            &:hover{
              background: $grey4;
            }
          }
        }
      }
    }
    a{
      display: block;
      padding: $padding;
      font-weight: $font-weight-normal;
      color: $white;
      text-align: center;
      transition-duration: 0.1s;
      &.active{
        background: $grey4;
      }
      &:hover{
        background: $grey3;
      }
    }
  }
}
</style>
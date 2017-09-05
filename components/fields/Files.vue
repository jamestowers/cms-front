<template>
    <div class="file-upload">
        <vue-clip 
          :options="options" 
          :on-complete="complete"
          :on-queue-complete="queueCompleted"
          :on-total-progress="totalProgress">

          <template slot="clip-uploader-action" scope="params">
              <div :class="{'is-dragging': params.dragging}" class="uploader-action">
                  <div class="dz-message">
                      <div><i class="icon-basic-upload huge"></i></div>
                      Click or Drag and Drop files here upload
                  </div>
              </div>
          </template>

          <template slot="clip-uploader-body" scope="props">
              <div class="total-progress">
                  <span class="total-progress-bar" :style="{ width: totalUploadProgress + '%'}"></span>
              </div>
              <div class="uploader-files">
                  <div class="uploader-file" v-for="file in props.files" :key="file.id">
                      <div class="file-thumbnail">
                          <img :src="file.dataUrl" />
                      </div>
                      <div class="file-details">
                          <div class="file-name">
                              {{ file.name }}
                          </div>
                          <div class="file-progress" v-if="file.status !== 'error' && file.status !== 'success'">
                              <span class="file-progress-bar" :style="{ width: file.progress + '%'}"></span>
                          </div>
                          <div class="file-meta" v-else>
                              <span class="file-type">{{ file.type }}</span>
                              <span class="file-size">{{ formatBytes(file.size) }}</span>
                              <span :class="{'is-error': file.status === 'error', 'is-success': file.status === 'success'}" class="file-status">{{ file.status }}</span>
                              <span v-if="file.status === 'error'" class="file-error is-error">{{ file.errorMessage.message }}</span>
                          </div>
                      </div>
                  </div>
              </div>
          </template>

        </vue-clip>

        <div class="uploader-files">
            <div class="uploader-file" v-for="file in currentFiles" :key="file.id">
                <div class="file-thumbnail">
                    <img v-if="file.mime_type.substring(0, 5) == 'image'" :src="`${baseUrl}/${file.path}thumbnail/${file.url}`" />
                </div>
                <div class="file-details">
                    <div class="file-name">
                        {{ file.url }}
                    </div>
                    <div class="file-meta">
                        <span class="file-type">{{ file.mime_type }}</span>
                        <span class="file-size">{{ formatBytes(file.size) }}</span>
                        <br />
                        <a @click.prevent="deleteFile" class="small" :data-id="file.id" href="javascript:;">remove</a>
                    </div>
                </div>
            </div>
        </div>
        
    </div>
</template>

<script>
    import axios from '~/plugins/axios'

    export default {
      props: {
        acceptedTypes: {
          type: Array,
          default () {
            return []
          }
        },
        currentFiles: {
          type: Array
        },
        url: {
          type: String,
          default: '/media/upload'
        }
      },

      data () {
        return {
          baseUrl: process.env.baseUrl,
          options: {
            url: this.url,
            paramName: 'file',
            acceptedFiles: {
              extensions: this.acceptedTypes,
              message: 'Sorry, this file type is not accepted'
            }
          },
          totalUploadProgress: 0,
          uploadedFiles: [],
          allFilesUploaded: false
        }
      },

      methods: {

        totalProgress (progress, totalBytes, bytesSent) {
          this.totalUploadProgress = progress
        },

        complete (file, status, xhr) {
          if (status === 'error') {
            console.log(file.errorMessage)
          } else {
            let resp = JSON.parse(xhr.response)
            // returns id, path and url from controller response
            // this.uploadedFiles.push(resp)
            this.$emit('file-uploaded', resp)
          }
        },

        queueCompleted () {
          console.log('All files uploaded')
          this.allFilesUploaded = true
          this.totalUploadProgress = 0
        },

        deleteFile (e) {
          let id = e.currentTarget.dataset.id
          let self = this
          axios.delete(`/media/${id}`)
            .then(function (response) {
              if (response.data.status === 'success') {
                self.$store.commit('status/set', response.data.message)
                let index = self.currentFiles.findIndex((el) => el.id === id)
                self.currentFiles.splice(index, 1)
                self.loading = false
              }
            })
            .catch(function (error) {
              let errorMsg = error.message || error.response.data.message
              self.$store.commit('status/set', errorMsg)
              self.loading = false
            })
        },

        formatBytes (bytes, decimals) {
          if (bytes === 0) return '0 Bytes'
          let k = 1024
          let dm = decimals || 2
          let sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
          let i = Math.floor(Math.log(bytes) / Math.log(k))
          return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
        }
      }

    }
</script>

<style lang="scss">
    
    @import "~assets/scss/global/variables";
    
    .uploader-action{
        background: $grey7;
        text-align: center;
        padding: $space-1;
        transition: background 0.4s $ease-out-expo;
        &.is-dragging {
          background: lighten($color-primary, 10);
        }
    }

    .dz-message{
        color: $grey5;
        border: 2px dashed $color-primary;
        border-radius: 10px;
        cursor: pointer;
        padding: $space-3;
        font-weight: $font-weight-bold;
    }

    .uploader-files{
        .uploader-file{
          background: $white;
          padding: $space-1;
          display: flex;
          margin-bottom: $space-1;
        }
        .file-thumbnail{
          background: $grey7;
          border: 1px solid $grey6;
          flex: 0 0 60px;
          height:60px;
        }
        .file-details{
          flex: 1 1 auto;
          padding-left: $space-1;
          span{
            font-size: 1rem;
            margin-right: $space-1;
          }
          .file-name{
              font-weight: $font-weight-bold;
          }
          .file-size{
              font-style: italic;
              color: $grey5;
          }
          .file-status{
              font-weight: $font-weight-bold;
              text-transform: uppercase;
          }
          .file-type{
              font-style: italic;
              color: $grey5;
          }
        }
    }

    .file-progress,
    .total-progress {
        background: $grey7;
        border-radius: 20px;
        overflow: hidden;
        height: 4px;  
        position: relative;
    }
    .file-progress-bar,
    .total-progress-bar {
        width: 0%;
        background: $color-primary;
        height: 100%;
        position: absolute;
        transition: width 0.4s ease-in-out;
        top:0;
        left:0;  
    }

</style>
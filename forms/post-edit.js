// import VueFormGenerator from 'vue-form-generator'

export default{
  groups: [
    {
      legend: 'User Details',
      styleClasses: 'col-3',
      fields: [{
        type: 'input',
        inputType: 'text',
        label: 'Title',
        model: 'post.title',
        required: true
      }, {
        type: 'input',
        inputType: 'text',
        label: 'URL',
        model: 'post.slug',
        placeholder: '/url-here',
        required: true
      }, {
        type: 'wysiwyg',
        label: 'Body',
        model: 'post.body'
      }, {
        type: 'files',
        label: 'Files',
        inputName: 'related_files',
        model: 'post.related_files'
      }, {
        type: 'checkbox',
        label: 'Hidden',
        model: 'post.hidden',
        default: false
      }, {
        type: 'submit',
        buttonText: 'Save Post'
      }]
    }
  ]
}

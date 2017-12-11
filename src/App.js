import React, { Component } from 'react';
import $ from 'jquery'
import IdleTimer from 'react-idle-timer';
//import Files from './Components/Files'
import Regions from './Components/Regions'
import Verticals from './Components/Verticals'
import Documents from './Components/Documents'
import Briefcase from './Components/Briefcase'

import './App.css';

class App extends Component {

  constructor(){
    super();
    this.state = {
      debug: true,
      timeout: 2*60*1000,
      projects: [],
      files:[],
      files_filtered:[],
      files_selected:[],
      regions:[],
      verticals:[],
      categories:[],
      region_filter: "none",
      vertical_filter: "none",
      category_filter: "none",
      pages: ['start','regions','verticals','documents','briefcase','thanks'],
      page: 'start',
      user_name: '',
      user_email: '',
      viewStack: {
        pages: true,
        footer: true,
        bgvideo: true,
      },
    }
  }

  getFiles(){

    $.ajax({
      url: 'http://www.juniperebc.com/api/v1/files',
      dataType:'json',
      cache:false,
      success: function(data){

        var formatted_results = []
        $.each(data.results, function( index, value ) {
          var tmp = {};
          tmp['id'] = value.id;
          tmp['name'] = value.name;
          tmp['title'] = value.title;
          tmp['desc'] = value.desc;
          var tmp_tags = [];
          $.each(value.tags, function( index2, value2 ) {
            tmp_tags.push(value2.tag_id);
          });
          tmp['tags'] = tmp_tags;

          formatted_results.push(tmp)
        });

        this.setState({files:formatted_results}, function(){
          //console.log(this.state);
        });

        this.setState({files_filtered:formatted_results});

      }.bind(this),
        error: function(xhr, status, error){
        console.log(error);
      }
    });

  }

  getRegions(){

    $.ajax({
      url: 'http://www.juniperebc.com/api/v1/tags',
      dataType:'json',
      cache:false,
      success: function(data){

        this.setState({categories:data.results.category});
        this.setState({regions:data.results.region});
        this.setState({verticals:data.results.vertical});

        //this.setState({filesVisible:true});

      }.bind(this),
        error: function(xhr, status, error){
        console.log(error);
      }
    });
  }


  //lifecycle methods
  componentWillMount(){
    //this.getProjects();
    this.getFiles();
    this.getRegions();
  }

  componentDidMount(){
    this.getFiles();
    this.getRegions();
  }



  handleApplyFilters(){
    var files_filtered = []
    var region_filter = this.state.region_filter;
    var vertical_filter = this.state.vertical_filter;
    var category_filter = this.state.category_filter;

    $.each(this.state.files, function( index, item ) {

      var found = true;
      if (($.inArray(region_filter, item.tags) < 0) && (region_filter !== 'none')) {
        found = false;
      }
      if (($.inArray(vertical_filter, item.tags) < 0) && (vertical_filter !== 'none')) {
        found = false;
      }
      if (($.inArray(category_filter, item.tags) < 0) && (category_filter !== 'none')) {
        found = false;
      }
      if (found) {
        files_filtered.push(item);
      }
    });

    this.setState({files_filtered: files_filtered})
  }

  handleApplyRegionFilter(tag) {
    this.setState({region_filter: tag},
      () => this.handleApplyFilters()
    );
    //this.handleNextClick();
  }
  handleApplyVerticalFilter(tag) {
    this.setState({vertical_filter: tag},
      () => this.handleApplyFilters()
    );
  }
  handleApplyCategoryFilter(tag) {
    this.setState({category_filter: tag},
      () => this.handleApplyFilters()
    );
  }






  handleAddDocument(file){
    console.log('add-' + file.id);
    let files_selected = this.state.files_selected;
    let index = files_selected.findIndex(x => x.id === file.id);
    if (index < 0) {
      files_selected.push(file);
    }
    this.setState({files_selected:files_selected});
  }

  handleRemoveDocument(file){
    console.log('delete-' + file.id);
    let files_selected = this.state.files_selected;
    let index = files_selected.findIndex(x => x.id === file.id);
    if (index >= 0) {
      files_selected.splice(index, 1);
    }
    this.setState({files_selected:files_selected});
  }


  handleDownloadRequest(user_name, user_email, notify){
    this.setState({user_name:user_name});
    this.setState({user_email:user_email});

    //alert(user_name + " " + user_email);
    var tmp_obj = {};
    tmp_obj["user_name"] = user_name;
    tmp_obj["user_email"] = user_email;
    tmp_obj["notify"] = notify;
    tmp_obj["file_ids"] = [];
    $.each(this.state.files_selected, function( index, value ) {
      tmp_obj["file_ids"].push(value.id);
    });

    console.log(JSON.stringify(tmp_obj));

    $.ajax({
        type: 'POST',
        url: 'http://www.juniperebc.com/api/v1/request/package',
        data: JSON.stringify(tmp_obj), // or JSON.stringify ({name: 'jonas'}),
        success: function(data) { console.log(JSON.stringify(data)) },
        contentType: "application/json",
        dataType: 'json'
    });

    this.handleNextClick();
  }

  handleShowAndHideFooter(){
    let viewStack = {
      pages: this.state.viewStack['pages'],
      footer: !this.state.viewStack['footer'],
      bgvideo: this.state.viewStack['bgvideo'],
    }
    this.setState({viewStack:viewStack});
  }



  handleReset(){
    this.setState({files_filtered: this.state.files})
    this.setState({files_selected: []})
    this.setState({region_filter: 'none'})
    this.setState({vertical_filter: 'none'})
    this.setState({category_filter: 'none'})
    this.setState({user_name: ''});
    this.setState({user_email: ''});
    this.handleShowPage(this.state.pages[0]);
  }


  handleShowPage(page_id)  {
    if (page_id === 'regions') {
      this.handleReset();
    }
    this.setState({page: page_id});
  }

  handleStartClick()  {
    this.handleShowPage('regions')
  }

  handleNextClick()  {
    let index = this.state.pages.findIndex(x => x === this.state.page);
    if (index < (this.state.pages.length - 1)) {
      let page = this.state.pages[index + 1];
      this.handleShowPage(page)
    }
  }

  handleBackClick()  {
    let index = this.state.pages.findIndex(x => x === this.state.page);
    if (index > 0) {
      let page = this.state.pages[index - 1];
      this.handleShowPage(page)
    }
  }


  _onActive = () => {
    //this.setState({ isIdle: false });
  }

  _onIdle = () => {
    //this.setState({ isIdle: true });
    this.handleReset();
  }


  render() {


    return (
      <IdleTimer
        ref="idleTimer"
        activeAction={this._onActive}
        idleAction={this._onIdle}
        timeout={this.state.timeout}
        startOnLoad={true}
        format="MM-DD-YYYY HH:MM:ss.SSS">

      <div className="App">


        {
          this.state.page === 'start'
            ?
            <div className="Start">
              <h1></h1>
              <h2 className="light-blue">Executive Briefing Center Verticals Information Kiosk</h2>
              <p><button onClick={this.handleStartClick.bind(this)}>Touch to Start</button></p>
            </div>
            : null
        }
        {
          this.state.page === 'regions'
            ?<Regions regions={this.state.regions}
                        onSelect={this.handleApplyRegionFilter.bind(this)}
                        onNext={this.handleNextClick.bind(this)}
                        onBack={this.handleBackClick.bind(this)}
                        />
            : null
        }
        {
          this.state.page === 'verticals'
            ?<Verticals docs={this.state.files_filtered}
                        vertical_filter={this.state.vertical_filter}
                        category_filter={this.state.category_filter}
                        verticals={this.state.verticals}
                        categories={this.state.categories}
                        onSelectVertical={this.handleApplyVerticalFilter.bind(this)}
                        onSelectCategory={this.handleApplyCategoryFilter.bind(this)}
                        onNext={this.handleNextClick.bind(this)}
                        onBack={this.handleBackClick.bind(this)}
                        />
            : null
        }
        {
          this.state.page === 'documents'
            ?<Documents docs={this.state.files_filtered}
                        docs_selected={this.state.files_selected}
                        region_filter={this.state.region_filter}
                        vertical_filter={this.state.vertical_filter}
                        category_filter={this.state.category_filter}
                        onAdd={this.handleAddDocument.bind(this)}
                        onRemove={this.handleRemoveDocument.bind(this)}
                        onNext={this.handleNextClick.bind(this)}
                        onBack={this.handleBackClick.bind(this)}
                        />
            : null
        }
        {
          this.state.page === 'briefcase'
            ?<Briefcase docs={this.state.files_selected}
                        onSubmit={this.handleDownloadRequest.bind(this)}
                        onNext={this.handleNextClick.bind(this)}
                        onBack={this.handleBackClick.bind(this)}
                        />
            : null
        }
        {
          this.state.page === 'thanks'
            ?
            <div className="Thanks">
              <h1></h1>
              <h2>Thank You</h2>
              <h3 className="light-blue">{this.state.user_name}</h3>
              <p className="light-gray">The Juniper Digital Concierge has emailed you the requested files.<br/>Please explore and download additional files at your convience.</p>
              <p><button className="btn btn-lg" onClick={this.handleStartClick.bind(this)}>Touch to Start</button></p>
            </div>
            : null
        }
        {
          this.state.viewStack['bgvideo']
            ?
            <video id="video-background" muted loop autoPlay>
              <source src="static/videos/background_video_loop_hd.mp4" type="video/mp4" />
            </video>
            :
            <img src="static/images/bg.png" id="video-background" />
        }

        {
          this.state.debug
            ?
            <div className="debug">
            <p>DEBUG:<br/>filters[{ this.state.region_filter }, { this.state.vertical_filter }, { this.state.category_filter }]<br/>files: {this.state.files.length}<br/>files_filtered: {this.state.files_filtered.length}<br/>files_selected: {this.state.files_selected.length}<br/>user_name: {this.state.user_name}<br/>user_email: {this.state.user_email}</p>
            </div>
            : null
        }
      </div>

      </IdleTimer>

    );
  }




}

export default App;

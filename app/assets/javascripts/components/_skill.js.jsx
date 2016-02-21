var Skill = React.createClass({
  getInitialState() {
    return { editable: false }
  },

  handleEdit() {
    if (this.state.editable) {
      this.onUpdate();
    }

    this.setState({ editable: !this.state.editable })
  },

  onUpdate() {
    if (this.state.editable) {
      var skill   = { id: this.props.skill.id,
                      name: this.refs.name.value,
                      details: this.refs.details.value,
                      level: this.props.skill.level }

      this.props.handleUpdate(skill);
    }

    this.setState({ editable: !this.state.editable })
  },

  handleLevelChange(action) {
    if (this.levelCanBeChanged(action)) {
      var level = this.getNewLevel(action)
      var skill = {id: this.props.skill.id, level: level }

      this.props.handleUpdate(skill);
    }

  },

  levelCanBeChanged(action, limit) {
    return action === 'up' && limit < 2 ||  action === 'down' && limit > 0;
  },

  updatedSkill(action, index) {
    var id       = this.props.skill.id;
    var name     = this.props.skill.name;
    vardetails  = this.props.skill.details;

    var levels   = ['bad', 'halfbad', 'fantastic'];
    var change   = action === 'up' ? 1 : - 1;
    var newLevel = action ? levels[index + change] : this.props.skill.level;

    return {id: id, name: name, details: details, level: newLevel}
  },

  getNewLevel(action, index) {
    var levels   = ['bad', 'halfbad', 'fantastic'];
    var change   = action === 'up' ? 1 : - 1;

    return action ? levels[index + change] : this.props.skill.level;
  },

  render () {
    var name = this.state.editable ? <input type='text'
                                            ref='name'
                                            defaultValue={this.props.skill.name} />
                                   : <h3>{this.props.skill.name}</h3>

    var details = this.state.editable ? <textarea type='text'
                                                  ref='details'
                                                  defaultValue={this.props.skill.details}></textarea>
                                      : <p>{this.props.skill.details}</p>

    return (
      <div>
      {name}

        <div className='skill-level'>
          <button type="button" className="btn btn-default btn-sm" onClick={this.handleLevelChange.bind(this, 'down')}>
            <span className="glyphicon glyphicon-triangle-bottom"></span>
          </button>

          <p><strong>Level:</strong> {this.props.skill.level}</p>

          <button type="button" className="btn btn-default btn-sm">
            <span className="glyphicon glyphicon-triangle-top" onClick={this.handleLevelChange.bind(this, 'up')}></span>
          </button>
        </div>

        {details}

        <button onClick={this.handleEdit}>{this.state.editable ? 'Submit' : 'Edit' }</button>

        <button onClick={this.props.handleDelete}>Delete</button>
      </div>
    )
  }
})

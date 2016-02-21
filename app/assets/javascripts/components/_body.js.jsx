var Body = React.createClass({
  getInitialState() {
    return { skills: [] };
  },

  componentDidMount() {
    $.getJSON('/api/v1/skills.json', (response) => { this.setState({ skills: response }) });
  },

  handleSubmit(skill) {
    var newState = this.state.skills.concat(skill);
    this.setState({ skills: newState });
  },

  handleDelete(id) {
    $.ajax({
      url: `/api/v1/skills/${id}`,
      type: 'DELETE',
      success: () => {
        this.removeIdeaFromDOM(id);
      }
    });
  },

  removeIdeaFromDOM(id) {
    var newSkills = this.state.skills.filter((skill) => {
      return skill.id != id;
    });

    this.setState({ skills: newSkills });
  },

  render() {
    return (
      <div>
        <AllSkills skills={this.state.skills} handleDelete={this.handleDelete} />
        <NewSkill handleSubmit={this.handleSubmit} />
      </div>
    )
  }
})

<template>
  <div class="home">
    <div class="panel panel-primary">
      <div class="panel-heading">
        <h3 class="panel-title">[USER] Login</h3>
      </div>
      <div class="panel-body">
        <span class="l">url</span> /api/users/login <br/>
        <span class="l">method</span> POST <br/>
        <span class="l">body</span> { email, phoneNumber, password, platform: emum[iOS, android, web], deviceId }
      </div>
    </div>
    <div class="panel panel-primary">
      <div class="panel-heading">
        <h3 class="panel-title">[USER] Login with Facebook</h3>
      </div>
      <div class="panel-body">
        <span class="l">url</span> /api/users/loginWithFacebook <br/>
        <span class="l">method</span> POST <br/>
        <span class="l">body</span> { facebookToken, platform: emum[iOS, android, web], deviceId }
      </div>
    </div>
    <div class="panel panel-primary">
      <div class="panel-heading">
        <h3 class="panel-title">[USER] Register</h3>
      </div>
      <div class="panel-body">
        <span class="l">url</span> /api/users/register <br/>
        <span class="l">method</span> POST <br/>
        <span class="l">body</span> { email, phoneNumber, password, name, platform: emum[iOS, android, web], deviceId }
      </div>
    </div>
    <div class="panel panel-primary">
      <div class="panel-heading">
        <h3 class="panel-title">[USER] Forgot password</h3>
      </div>
      <div class="panel-body">
        <span class="l">url</span> /api/users/forgotPassword <br/>
        <span class="l">method</span> POST <br/>
        <span class="l">body</span> { email }
      </div>
    </div>
    <div class="panel panel-primary">
      <div class="panel-heading">
        <h3 class="panel-title">[USER] Refresh token</h3>
      </div>
      <div class="panel-body">
        <span class="l">url</span> /api/users/token <br/>
        <span class="l">header</span> { Authorization: <u>token</u> } <br/>
        <span class="l">method</span> POST <br/>
      </div>
    </div>
    <div class="panel panel-primary">
      <div class="panel-heading">
        <h3 class="panel-title">[USER] Logout</h3>
      </div>
      <div class="panel-body">
        <span class="l">url</span> /api/users/logout <br/>
        <span class="l">header</span> { Authorization: <u>token</u> } <br/>
        <span class="l">method</span> POST <br/>
        <span class="l">body</span> { platform: emum[iOS, android, web], deviceId }
      </div>
    </div>
    <div class="panel panel-primary">
      <div class="panel-heading">
        <h3 class="panel-title">[USER] Update profile</h3>
      </div>
      <div class="panel-body">
        <span class="l">url</span> /api/users/update <br/>
        <span class="l">method</span> POST <br/>
        <span class="l">header</span> { Authorization: <u>token</u> } <br/>
        <span class="l">body</span> { name }
      </div>
    </div>
    <div class="panel panel-primary">
      <div class="panel-heading">
        <h3 class="panel-title">[USER] Get My Profile</h3>
      </div>
      <div class="panel-body">
        <span class="l">url</span> /api/users/me <br/>
        <span class="l">method</span> GET <br/>
        <span class="l">header</span> { Authorization: <u>token</u> } <br/>
        <span class="l">params</span> { <i>populate: 'projects'</i> } <br/>
      </div>
    </div>
    <div class="panel panel-primary">
      <div class="panel-heading">
        <h3 class="panel-title">[USER] Get A Profile By Id</h3>
      </div>
      <div class="panel-body">
        <span class="l">url</span> /api/users/me/<u>:id</u> <br/>
        <span class="l">method</span> GET <br/>
        <span class="l">header</span> { Authorization: <u>token</u> } <br/>
        <span class="l">params</span> { <i>populate: 'projects'</i> } <br/>
      </div>
    </div>

    <div class="panel panel-primary">
      <div class="panel-heading">
        <h3 class="panel-title">[USER] Change password</h3>
      </div>
      <div class="panel-body">
        <span class="l">url</span> /api/users/changePassword <br/>
        <span class="l">method</span> POST <br/>
        <span class="l">header</span> { Authorization: <u>token</u> } <br/>
        <span class="l">body</span> { oldPassword, newPassword }
      </div>
    </div>

    <div class="panel panel-primary">
      <div class="panel-heading">
        <h3 class="panel-title">[PROJECT] Create Project</h3>
      </div>
      <div class="panel-body">
        <span class="l">url</span> /api/projects <br/>
        <span class="l">method</span> POST <br/>
        <span class="l">header</span> { Authorization: <u>token</u> } <br/>
        <span class="l">body</span> { name, category: categoryId, detail, type: emum[raiseFunding, idea], phoneNumber, startDate, endDate, thumbnail, location: [<u>lng</u>, <u>lat</u>] }
      </div>
    </div>

    <div class="panel panel-primary">
      <div class="panel-heading">
        <h3 class="panel-title">[PROJECT] Get project by ID</h3>
      </div>
      <div class="panel-body">
        <span class="l">url</span> /api/projects/<u>:id</u> <br/>
        <span class="l">method</span> GET <br/>
        <span class="l">header</span> { Authorization: <u>token</u> } <br/>
        <span class="l">params</span> { <i>populate: 'owner,category'</i> } <br/>
      </div>
    </div>

    <div class="panel panel-primary">
      <div class="panel-heading">
        <h3 class="panel-title">[PROJECT] Get projects</h3>
      </div>
      <div class="panel-body">
        <span class="l">url</span> /api/projects</u> <br/>
        <span class="l">method</span> GET <br/>
        <span class="l">header</span> { Authorization: <u>token</u> } <br/>
        <span class="l">params</span> { where: { <i>type: enum["raiseFunding", "idea"]}</i>, limit, skip, <i>populate: 'owner,category'</i> } <br/>
      </div>
    </div>

    <div class="panel panel-primary">
      <div class="panel-heading">
        <h3 class="panel-title">[PROJECT] Get projects by Near Me</h3>
      </div>
      <div class="panel-body">
        <span class="l">url</span> /api/projects/nearMe</u> <br/>
        <span class="l">method</span> GET <br/>
        <span class="l">header</span> { Authorization: <u>token</u> } <br/>
        <span class="l">params</span> { where: { <i>type: enum["raiseFunding", "idea"]}</i>, location: [<u>lng</u>, <u>lat</u>]}, limit, skip, <i>populate: 'owner,category'</i> } <br/>
      </div>
    </div>

    <div class="panel panel-primary">
      <div class="panel-heading">
        <h3 class="panel-title">[PROJECT] Follow a project</h3>
      </div>
      <div class="panel-body">
        <span class="l">url</span> /api/projects/follow</u> <br/>
        <span class="l">method</span> POST <br/>
        <span class="l">header</span> { Authorization: <u>token</u> } <br/>
        <span class="l">body</span> { projectId } <br/>
      </div>
    </div>

    <div class="panel panel-primary">
      <div class="panel-heading">
        <h3 class="panel-title">[CATEGORY] Create new category</h3>
      </div>
      <div class="panel-body">
        <span class="l">url</span> /api/categories <br/>
        <span class="l">method</span> POST <br/>
        <span class="l">header</span> { Authorization: <u>token</u> } <br/>
        <span class="l">body</span> { name }
      </div>
    </div>

    <div class="panel panel-primary">
      <div class="panel-heading">
        <h3 class="panel-title">[CATEGORY] Update a category</h3>
      </div>
      <div class="panel-body">
        <span class="l">url</span> /api/categories/<u>id</u> <br/>
        <span class="l">method</span> PUT <br/>
        <span class="l">header</span> { Authorization: <u>token</u> } <br/>
        <span class="l">body</span> { name }
      </div>
    </div>

    <div class="panel panel-primary">
      <div class="panel-heading">
        <h3 class="panel-title">[CATEGORY] Get catetories</h3>
      </div>
      <div class="panel-body">
        <span class="l">url</span> /api/categories <br/>
        <span class="l">method</span> GET <br/>
        <span class="l">header</span> { Authorization: <u>token</u> } <br/>
        <span class="l">params</span> { limit, skip } <br/>
      </div>
    </div>

    <div class="panel panel-primary">
      <div class="panel-heading">
        <h3 class="panel-title">[CATEGORY] Get catetory by id</h3>
      </div>
      <div class="panel-body">
        <span class="l">url</span> /api/categories/<u>id</u> <br/>
        <span class="l">method</span> GET <br/>
        <span class="l">header</span> { Authorization: <u>token</u> } <br/>
      </div>
    </div>

    <div class="panel panel-primary">
      <div class="panel-heading">
        <h3 class="panel-title">[HISTORY] Get histories</h3>
      </div>
      <div class="panel-body">
        <span class="l">url</span> /api/histories</u> <br/>
        <span class="l">method</span> GET <br/>
        <span class="l">header</span> { Authorization: <u>token</u> } <br/>
        <span class="l">params</span> { limit, skip, <i>populate: 'project,user'</i> } <br/>
      </div>
    </div>

    <div class="panel panel-primary">
      <div class="panel-heading">
        <h3 class="panel-title">[HISTORY] Get history by ID</h3>
      </div>
      <div class="panel-body">
        <span class="l">url</span> /api/histories/<u>:id</u> <br/>
        <span class="l">method</span> GET <br/>
        <span class="l">header</span> { Authorization: <u>token</u> } <br/>
        <span class="l">params</span> { <i>populate: 'project,user'</i> } <br/>
      </div>
    </div>

    <div class="panel panel-primary">
      <div class="panel-heading">
        <h3 class="panel-title">[NOTIFICATION] Get notifications</h3>
      </div>
      <div class="panel-body">
        <span class="l">url</span> /api/notificaitons</u> <br/>
        <span class="l">method</span> GET <br/>
        <span class="l">header</span> { Authorization: <u>token</u> } <br/>
        <span class="l">params</span> { limit, skip, <i>populate: 'project,user,fromUser'</i> } <br/>
      </div>
    </div>

    <div class="panel panel-primary">
      <div class="panel-heading">
        <h3 class="panel-title">[NOTIFICATION] Get notification by ID</h3>
      </div>
      <div class="panel-body">
        <span class="l">url</span> /api/notificaitons/<u>:id</u> <br/>
        <span class="l">method</span> GET <br/>
        <span class="l">header</span> { Authorization: <u>token</u> } <br/>
        <span class="l">params</span> { <i>populate: 'project,user,fromUser'</i> } <br/>
      </div>
    </div>
  </div>
</template>

<style lang="stylus">
  .home
    padding 20px
    font-family monospace
    span.l
      display inline-block
      width 70px
      font-weight 600
      text-transform uppercase

    i
      color gray

    u
      color green
      font-weight 600
</style>

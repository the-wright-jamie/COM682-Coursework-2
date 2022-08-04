import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import shajs from 'sha.js';

@Injectable({
  providedIn: 'root'
})
export class ApiInterfaceService {
  constructor(private httpClient: HttpClient) {}

  // --- IN RELATION TO USERS --- //

  // this returns a list of all users
  getUsers() {
    return this.httpClient.get(
      'https://prod-15.centralus.logic.azure.com/workflows/4bdd3afb9e514c88b8954a2c72a9edbd/triggers/manual/paths/invoke/api/v1/users?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=g3_krp1UaCchIcB6I2Zqdi6Cigs9yHtpnSTYxd8MNgY'
    );
  }

  // this gets a specific user based on the passed in username
  getUser(username: string) {
    return this.httpClient.get(
      'https://prod-14.centralus.logic.azure.com/workflows/ae5e973dbfc149ff8c0c41d0bf3bf828/triggers/manual/paths/invoke/api/v1/users/' +
        username +
        '?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=HVTFvbyzhnueDxUcw6d_Rb7xd_z4KyueLDRUL-tD138'
    );
  }

  // --- IN RELATION TO POSTS --- //

  // this gets posts from a specified user based on the user ID
  getPosts(userId: number) {
    return this.httpClient.get(
      'https://prod-27.centralus.logic.azure.com/workflows/621d7b6820614a5e8544eea8ee05e82e/triggers/manual/paths/invoke/api/v1/posts/' +
        userId +
        '?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=TqVYFNkvJEWl5knqCl9fj-H5I7LKXY39Sy7khlOAoBM'
    );
  }

  //
  getPostsByUser(username: string) {
    return this.httpClient.get(
      'https://prod-18.centralus.logic.azure.com/workflows/9f78a4aa0732455da757fd01f0058b58/triggers/manual/paths/invoke/api/v1/userPosts/' +
        username +
        '?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=WQTmVxs_I-Hfh19p4lES7tCL25XiQXc659iv4OiM1HY'
    );
  }

  // this gets a single post based on the post ID number
  getPost(postId: number) {
    return this.httpClient.get(
      'https://prod-01.centralus.logic.azure.com/workflows/da85adce2c474fc5a7ac849f019cb26f/triggers/manual/paths/invoke/api/v1/post/' +
        postId +
        '?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=SdgavJBTvS9Xm7DJzI6lgs2m6pXeVX2KxYt1xx7CMog'
    );
  }

  // --- IN RELATION TO COMMENTS --- //

  // this gets the comments for a specific post based on the post ID
  getComments(postId: number) {
    return this.httpClient.get(
      'https://prod-14.centralus.logic.azure.com/workflows/52f903233ac54a69982582f04b679fe1/triggers/manual/paths/invoke/api/v1/comments/' +
        postId +
        '?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=cHO_QFWQ84971ukEUAZI_gzW7uBh9m_fw9fWrfir38o'
    );
  }

  // get the comments a user has posted based on the username
  getUserComments(username: string) {
    return this.httpClient.get(
      'https://prod-28.centralus.logic.azure.com/workflows/9f6317a6b3e949d390bd36f3f86c09f0/triggers/manual/paths/invoke/api/v1/userComments/' +
        username +
        '?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=TvKLdC1KBn8710bH28sEvPM7fMzq8_f2dfMcLPBAu5w'
    );
  }

  // --- IN RELATION TO FOLLOW SYSTEM --- //

  getFollowingForUser(userId: number) {
    return this.httpClient.get(
      'https://prod-26.centralus.logic.azure.com/workflows/d2182750ef944d9bbeb5d3aad843bcbc/triggers/manual/paths/invoke/api/v1/following/' +
        userId +
        '?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=dNRi0grm6HILV5Tc7IkhKJPjTiQSB_oJbRFE3B1NRfw'
    );
  }

  getFollowersForUser(userId: number) {
    return this.httpClient.get(
      'https://prod-28.centralus.logic.azure.com/workflows/75b745b52d0f4561a7a53dcfec869a92/triggers/manual/paths/invoke/api/v1/followers/' +
        userId +
        '?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=nfufgQ6JuKnuVnDGiokUrw9l5N274Np3i78xYNahErY'
    );
  }

  getFollowingAndFollowerCountForUser(userId: number) {
    return this.httpClient.get(
      'https://prod-08.centralus.logic.azure.com/workflows/f51b16edd0cc44f68653d2c5ac9156ba/triggers/manual/paths/invoke/api/v1/followCount/' +
        userId +
        '?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=Si1xhbiVK6docG0RQsvnoYMC2W8G4kRSPB4idmNicj8'
    );
  }

  //
  followUser(followerId: number, followingId: number) {
    console.log('follow user');
    return this.httpClient.put(
      'https://prod-16.centralus.logic.azure.com/workflows/bf64471072c44f5ba7b8a61aa0ae1a3a/triggers/manual/paths/invoke/api/v1/follow?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=_aLIgslml1iUks-nGafE0zLIoL8dTu_6HoQND1_8Mhk',
      { followerId: followerId, followingId: followingId }
    );
  }

  // https://prod-06.centralus.logic.azure.com/workflows/74257f39224c4c7cacca6cc2dfa923ed/triggers/manual/paths/invoke/api/v1/unfollow?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=VDZmlQ_djyswMQQO7y9P88W6qrpCS9T7YowyWxRlTA0
  unfollowUser(followerId: number, followingId: number) {
    console.log('unfollow user');
    return this.httpClient.put(
      'https://prod-06.centralus.logic.azure.com/workflows/74257f39224c4c7cacca6cc2dfa923ed/triggers/manual/paths/invoke/api/v1/unfollow?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=VDZmlQ_djyswMQQO7y9P88W6qrpCS9T7YowyWxRlTA0',
      { followerId: followerId, followingId: followingId }
    );
  }

  // --- IN RELATION TO USER AUTHENTICATION --- //

  // hashes the password so we aren't sending raw passwords over the web
  // and then sends a post request to get the login token
  // TODO actually save the token in azure
  login(username: string, password: string) {
    password = shajs('sha256').update(password).digest('hex');
    return this.httpClient.post(
      'https://prod-13.centralus.logic.azure.com/workflows/29fa72dadcd34b81b70fd89d7584abc0/triggers/manual/paths/invoke/api/v1/login?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=zlkcA11VpgoSw_R-D09IrH8G1H4ZWR62HXWQcn3t_GE',
      { username: username, password: password }
    );
  }

  isTokenValid(token: string) {
    throw new Error(
      'Received token: ' + token + '. However, this method not implemented yet.'
    );
  }
}

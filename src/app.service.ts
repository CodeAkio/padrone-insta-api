import { HttpService } from '@nestjs/axios';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(private httpService: HttpService) {}

  async getProfileByUsername(username: string): Promise<any> {
    const url = `https://www.instagram.com/${username}/?__a=1&access_token=EABatZA0WXi5QBAAmGvt1E6GxjpxGCjKbY3CBVz5jzyaaVTv4A4baIDj6c1vosCQTRlay9hVT3qAUkGkkPZAv2NTbbDRhLUk5CxeRvdFKzW5A0GVaourJC3NNuWXeFR7XZCE6LVQPq3wf9OGLcOZBgVICgqlpg9trioaSXbd7BH8t4XxTxaypMohrRsGP3IryUUruHjFCw3F8NyAeawaIfk0ADbqwZCDsZD`;
    console.log('URL: ', url);

    try {
      const response = await this.httpService.get(url).toPromise();

      console.log('Response: ', response.data);
      return response.data;

      // const profileData = {
      //   id: response.data.graphql.user.id,
      //   name: response.data.graphql.user.full_name,
      //   username: response.data.graphql.user.username,
      //   avatar: response.data.graphql.user.profile_pic_url_hd,
      //   bio: response.data.graphql.user.biography,
      //   website: response.data.graphql.user.external_url,
      //   category: response.data.graphql.user.category_name,
      //   followers: response.data.graphql.user.edge_followed_by.count,
      //   following: response.data.graphql.user.edge_follow.count,
      //   isVerified: response.data.graphql.user.is_verified,
      //   isBusiness: response.data.graphql.user.is_business_account,
      //   isProfessional: response.data.graphql.user.is_professional_account,
      //   address: response.data.graphql.user.business_address_json,
      //   email: response.data.graphql.user.business_email,
      //   phone: response.data.graphql.user.business_phone_number,
      //   totalPosts:
      //     response.data.graphql.user.edge_owner_to_timeline_media.count,
      //   totalVideos: response.data.graphql.user.edge_felix_video_timeline.count,
      //   lastPosts: this.getLastPosts(
      //     response.data.graphql.user.edge_owner_to_timeline_media.edges,
      //   ),
      // };

      // return profileData;
    } catch (error) {
      console.log('Error: ', error);
      throw new NotFoundException();
    }
  }

  // private getLastPosts(posts: Array<any>): Array<any> {
  //   if (!posts || posts.length <= 0) {
  //     return null;
  //   }

  //   const qtPosts = posts.length;

  //   if (qtPosts >= 10) {
  //     posts = posts.slice(0, 10);
  //   }

  //   return posts.map((post) => post.node.thumbnail_src);
  // }
}

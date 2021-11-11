import { HttpService } from '@nestjs/axios';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(private httpService: HttpService) {}

  async getProfileByUsername(username: string): Promise<any> {
    const url = `/${username}/?__a=1`;

    try {
      const response = await this.httpService.get(url).toPromise();

      const profileData = {
        id: response.data.graphql.user.id,
        name: response.data.graphql.user.full_name,
        username: response.data.graphql.user.username,
        avatar: response.data.graphql.user.profile_pic_url_hd,
        bio: response.data.graphql.user.biography,
        website: response.data.graphql.user.external_url,
        category: response.data.graphql.user.category_name,
        followers: response.data.graphql.user.edge_followed_by.count,
        following: response.data.graphql.user.edge_follow.count,
        isVerified: response.data.graphql.user.is_verified,
        isBusiness: response.data.graphql.user.is_business_account,
        isProfessional: response.data.graphql.user.is_professional_account,
        address: response.data.graphql.user.business_address_json,
        email: response.data.graphql.user.business_email,
        phone: response.data.graphql.user.business_phone_number,
        totalPosts:
          response.data.graphql.user.edge_owner_to_timeline_media.count,
        totalVideos: response.data.graphql.user.edge_felix_video_timeline.count,
        lastPosts: this.getLastPosts(
          response.data.graphql.user.edge_owner_to_timeline_media.edges,
        ),
      };

      return profileData;
    } catch (error) {
      throw new NotFoundException();
    }
  }

  private getLastPosts(posts: Array<any>): Array<any> {
    console.log(posts);
    if (!posts || posts.length <= 0) {
      return null;
    }

    const qtPosts = posts.length;

    if (qtPosts >= 10) {
      posts = posts.slice(0, 10);
    }

    return posts.map((post) => post.node.thumbnail_src);
  }
}

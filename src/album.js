export default function album() {
  return {
    getAlbum: id => this.request(`/albums/${id}`),
    getAlbums: ids => this.request(`/albums?ids=${ids}`),
    getAlbumTracks: id => this.request(`/albums/${id}/tracks`),
  };
}

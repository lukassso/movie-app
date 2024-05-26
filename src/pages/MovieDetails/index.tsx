import { useParams } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  CollapsibleTrigger,
  CollapsibleContent,
  Collapsible,
} from "@/components/ui/collapsible";
import placeholderImage from "@/assets/placeholder.svg";
import useFetch from "@/hooks/useFetch";
import { MovieType } from "@/types";

const MovieDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { isLoading, error, data } = useFetch(id || "", true);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error.show) {
    return <div>Error: {error.msg}</div>;
  }

  if (!data || data.length === 0) {
    return <div>No movie details found</div>;
  }

  const movie: MovieType = data[0];

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <Card x-chunk="dashboard-06-chunk-0">
            <CardContent>
              <div>
                <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                  <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                    <div>
                      <img
                        alt="Movie Poster"
                        className="w-full h-auto rounded-lg shadow-lg"
                        height={600}
                        src={
                          movie.Poster !== "N/A"
                            ? movie.Poster
                            : placeholderImage
                        }
                        style={{
                          aspectRatio: "400/600",
                          objectFit: "cover",
                        }}
                        width={400}
                      />
                    </div>
                    <div>
                      <h1 className="text-4xl font-bold mb-2 sm:text-5xl">
                        {movie.Title}
                      </h1>
                      <p className="text-gray-400 text-lg mb-4">
                        {movie.Genre}, {movie.Year}
                      </p>
                      <div className="grid grid-cols-1 gap-4 mb-8 sm:grid-cols-2">
                        <div>
                          <p className="text-gray-400 text-sm mb-1">
                            Release Date
                          </p>
                          <p>{movie.Released}</p>
                        </div>
                        <div>
                          <p className="text-gray-400 text-sm mb-1">Runtime</p>
                          <p>{movie.Runtime}</p>
                        </div>
                      </div>
                      <div className="mb-8 sm:text-lg">
                        <Collapsible>
                          <CollapsibleTrigger asChild>
                            <div className="flex items-center justify-between w-full text-left">
                              <p className="text-gray-400">{movie.Plot}</p>
                            </div>
                          </CollapsibleTrigger>
                        </Collapsible>
                      </div>
                      <div className="grid grid-cols-1 gap-4 mb-8 sm:grid-cols-2">
                        <div>
                          <p className="text-gray-400 text-sm mb-1">Director</p>
                          <p>{movie.Director}</p>
                        </div>
                        <div>
                          <p className="text-gray-400 text-sm mb-1">Writer</p>
                          <p>{movie.Writer}</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 gap-4 mb-8 sm:grid-cols-2">
                        <div>
                          <p className="text-gray-400 text-sm mb-1">Cast</p>
                          <p>{movie.Actors}</p>
                        </div>
                        <div>
                          <p className="text-gray-400 text-sm mb-1">
                            IMDb Rating
                          </p>
                          <p>{movie.imdbRating}</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 gap-4 mb-8 sm:grid-cols-2">
                        <div>
                          <p className="text-gray-400 text-sm mb-1">Awards</p>
                          <p>{movie.Awards}</p>
                        </div>
                        <div>
                          <p className="text-gray-400 text-sm mb-1">
                            Box Office
                          </p>
                          <p>{movie.BoxOffice}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <div className="text-xs text-muted-foreground">Footer</div>
            </CardFooter>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default MovieDetails;

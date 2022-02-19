import { Arg, Int, Mutation, Query, Resolver } from "type-graphql";
import { InjectRepository } from "typeorm-typedi-extensions";
import { Author } from "../../entity/Author";
import { Book } from "../../entity/Book";
import { AuthorRepo } from "../../repos/AuthorRepo";
import { BookRepo } from "../../repos/BookRepo";
//2nd way of doing it ,NOT recommended. maybe for LARGE projects
@Resolver()
export class AuthorDataMapper {
  @InjectRepository(AuthorRepo)
  private readonly authorRepo: AuthorRepo;
  @InjectRepository(BookRepo)
  private readonly bookRepo: BookRepo;

  @Mutation(() => Book)
  async createBook2(@Arg("name") name: string) {
    return this.bookRepo.save({ name });
  }

  @Mutation(() => Author)
  async createAuthor2(@Arg("name") name: string) {
    return this.authorRepo.save({ name });
  }

}
